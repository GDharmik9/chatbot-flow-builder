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
    addEdge
} from 'reactflow';
import Node from '../Node/Node';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';

import 'reactflow/dist/style.css';
import './Flowchart.css';

// Initial node setup
const initialNodes = [
    {
        id: "node_0",
        type: "node",
        data: { heading: "Send Message", label: "text message 1" },
        position: { x: 550, y: 300 },
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
    const [notification, setNotification] = useState('');

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

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { heading: "Send Message", label: `text message ${id}` },
            };

            console.log("Node created: ", newNode);
            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

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


    return (

        <div className='flow-container' >
            <Header notification={notification} />
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
                    nodeTypes={nodeTypes}
                />
            </div>
            <Sidebar />
        </div>
    )
}

export default Flowchart