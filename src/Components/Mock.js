import React, { useState } from 'react';

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
        <div style={{ marginLeft: node.level * 20 + 'px' }}>
            <div>
                {node.children && (
                    <button type="button" onClick={handleExpandToggle}>
                        {expanded ? '-' : '+'}
                    </button>
                )}
                <input
                    type="checkbox"
                    checked={node.checked || false}
                    onChange={handleCheckboxChange}
                />
                {node.label}
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
        <div>
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
