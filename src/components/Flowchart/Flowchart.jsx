import React, {
    useCallback,
    useEffect,
    useState,
    useMemo,
    useRef
} from 'react';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    addEdge,
    Controls,
} from 'reactflow';
import Node from '../Node/Node';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

import 'reactflow/dist/style.css';
import './Flowchart.css';

// Key for local storage
const flowKey = "flow-key";

// Initial node setup
const initialNodes = [
    {
        id: "node_0",
        type: "node",
        data: { heading: "Send Message", label: "text message 1" },
        position: { x: 350, y: 200 },
    },
];

let id = 1;

// Function for generating unique IDs for nodes
const getId = () => `node_${id++}`;

const Flowchart = () => {

    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [selectedElements, setSelectedElements] = useState([]);
    const [nodeName, setNodeName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null) // custom error message notification
    const [messageColor, setMessageColor] = useState(null) // custom color for error & success notification

    // Define custom node types
    const nodeTypes = useMemo(
        () => ({
            node: Node,
        }),
        []
    );

    // Enable drop effect on drag over
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    // Handle drop event to add a new node
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const type = event.dataTransfer.getData("application/reactflow");

            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = reactFlowInstance.screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { heading: "Send Message", label: `text message ${id}` },
            };

            //console.log("Node created: ", newNode);
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    let sourceHandle = []
    let targetHandle = []

    // Handle edge connection
    const onConnect = useCallback(
        (params) => {

            if (sourceHandle.includes(params.source)) return
            sourceHandle = sourceHandle.concat(params.source)
            console.log('source', sourceHandle)

            setEdges(
                (eds) => addEdge({ ...params, markerEnd: { type: 'arrowclosed' } }, eds) // to add arrowhead at the end of the edge connection pass additional params
            )

            // keep track of which target handles are connected
            if (targetHandle.includes(params.target)) return
            targetHandle = targetHandle.concat(params.target)
            console.log('target', targetHandle)
        },
        [setEdges]
    );

    //Check for empty target handles
    const checkEmptyTargetHandles = () => {
        let emptyTargetHandles = 0;
        edges.forEach((edge) => {
            if (!edge.targetHandle) {
                emptyTargetHandles++;
            }
        });
        return emptyTargetHandles;
    };


    // Check if any node is unconnected
    const isNodeUnconnected = useCallback(() => {
        let unconnectedNodes = nodes.filter(
            (node) =>
                !edges.find(
                    (edge) => edge.source === node.id || edge.target === node.id
                )
        );

        return unconnectedNodes.length > 0;
    }, [nodes, edges]);




    //Handle node click
    const onNodeClick = useCallback((event, node) => {
        setSelectedElements([node]);
        setNodeName(node.data.label);
        setNodes((nodes) =>
            nodes.map((n) => ({
                ...n,
                selected: n.id === node.id,
            }))
        );
    }, []);

    // Update nodes data when nodeName or selectedElements changes
    useEffect(() => {
        if (selectedElements.length > 0) {
            setNodes((nds) =>
                nds.map((node) => {
                    if (node.id === selectedElements[0]?.id) {
                        node.data = {
                            ...node.data,
                            label: nodeName,
                        };
                    }
                    return node;
                })
            );
        } else {
            setNodeName(""); // Clear nodeName when no node is selected
        }
    }, [nodeName, selectedElements, setNodes]);

    // Save flow to local storage
    const onSave = useCallback(() => {
        if (reactFlowInstance) {
            const emptyTargetHandles = checkEmptyTargetHandles();

            if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
                setErrorMessage('Cannot save Flow')
                setMessageColor('redMessage')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            } else {
                const flow = reactFlowInstance.toObject();
                localStorage.setItem(flowKey, JSON.stringify(flow));
                setErrorMessage('Saved Flow')
                setMessageColor('greenMessage')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            }
        }
    }, [reactFlowInstance, nodes, isNodeUnconnected]);


    return (

        <div className='flow-container' >
            <Header
                errorMessage={errorMessage}
                messageColor={messageColor}
                onSave={onSave} />
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onInit={setReactFlowInstance}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeClick={onNodeClick}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onPaneClick={() => {
                        setSelectedElements([]); // Reset selected elements when clicking on pane
                        setNodes((nodes) =>
                            nodes.map((n) => ({
                                ...n,
                                selected: false, // Reset selected state of nodes when clicking on pane
                            }))
                        );
                    }}

                />
                <Controls />
            </div>
            <Sidebar
                nodeName={nodeName}
                setNodeName={setNodeName}
                selectedNode={selectedElements[0]}
                setSelectedElements={setSelectedElements}
            />
        </div>
    )
}

export default Flowchart