import React, { useState } from 'react';

// TreeNode component
const TreeNode = ({ node, onToggle }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpandToggle = (e) => {
        e.stopPropagation(); // Prevent form submission
        setExpanded(!expanded);
    };

    const handleCheckboxChange = (e) => {
        e.stopPropagation(); // Prevent form submission
        onToggle(node, e.target.checked);
    };

    return (
        <div className={`ml-${node.level * 5}`}>
            <div className="flex items-center space-x-2">
                {node.children && (
                    <button 
                        type="button" 
                        onClick={handleExpandToggle}
                        className="text-gray-600"
                    >
                        {expanded ? '▼' : '►'}
                    </button>
                )}
                <input
                    type="checkbox"
                    checked={node.checked || false}
                    onChange={handleCheckboxChange}
                    className={`form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 ${node.checked ? 'bg-blue-600' : 'bg-gray-200'}`}
                />
                <span>{node.label}</span>
            </div>
            {expanded && node.children && (
                <div>
                    {node.children.map((childNode) => (
                        <TreeNode
                            key={childNode.id}
                            node={childNode}
                            onToggle={onToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// CheckboxTree component
const CheckboxTree = ({ data, onChange }) => {
    const [treeData, setTreeData] = useState(data);

    const handleToggle = (node, checked) => {
        const updateNode = (n) => {
            if (n.id === node.id) {
                n.checked = checked;

                // Check or uncheck all children when the parent is toggled
                if (n.children) {
                    n.children = n.children.map((child) => ({
                        ...child,
                        checked: checked,
                    }));
                }
            }

            // Recursively check/uncheck all children
            if (n.children) {
                n.children = n.children.map(updateNode);
            }
            return n;
        };

        const newData = treeData.map(updateNode);
        setTreeData(newData);
        onChange(newData);
    };

    return (
        <div className="space-y-2">
            {treeData.map((node) => (
                <TreeNode
                    key={node.id}
                    node={node}
                    onToggle={handleToggle}
                />
            ))}
        </div>
    );
};

export default CheckboxTree;
