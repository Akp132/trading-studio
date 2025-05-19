import { useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type LogicType = "AND" | "OR";

type Condition = {
  field: string;
  operator: string;
  value: string;
};

type RuleNode = {
  id: string;
  type: "condition" | "group";
  logic?: LogicType;
  children?: RuleNode[];
  data?: Condition;
};

type Action =
  | { type: "ADD_CONDITION"; parentId: string }
  | { type: "ADD_GROUP"; parentId: string; logic: LogicType }
  | { type: "REMOVE_NODE"; id: string }
  | { type: "UPDATE_CONDITION"; id: string; field: keyof Condition; value: string }
  | { type: "SET_LOGIC"; id: string; logic: LogicType };

interface RuleBuilderProps {
  onTreeChange: (tree: RuleNode) => void;
}

function reducer(state: RuleNode, action: Action): RuleNode {
  const update = (node: RuleNode): RuleNode => {
    if (node.id === action.id) {
      switch (action.type) {
        case "UPDATE_CONDITION":
          return { ...node, data: { ...node.data!, [action.field]: action.value } };
        case "SET_LOGIC":
          return { ...node, logic: action.logic };
        case "REMOVE_NODE":
          return node; // Handled at parent level
      }
    }

    if (node.children) {
      let updatedChildren = node.children
        .filter((child) => !(action.type === "REMOVE_NODE" && child.id === action.id))
        .map(update);

      if (action.type === "ADD_CONDITION" && node.id === action.parentId) {
        updatedChildren.push({
          id: uuidv4(),
          type: "condition",
          data: { field: "", operator: "", value: "" },
        });
      }

      if (action.type === "ADD_GROUP" && node.id === action.parentId) {
        updatedChildren.push({
          id: uuidv4(),
          type: "group",
          logic: action.logic,
          children: [],
        });
      }

      return { ...node, children: updatedChildren };
    }

    return node;
  };

  return update(state);
}

export default function RuleBuilder({ onTreeChange }: RuleBuilderProps) {
  const [tree, dispatch] = useReducer(reducer, {
    id: uuidv4(),
    type: "group",
    logic: "AND",
    children: [],
  });

  // Notify parent when rule tree changes
  useEffect(() => {
    onTreeChange(tree);
  }, [tree, onTreeChange]);

  const renderNode = (node: RuleNode) => {
    if (node.type === "condition" && node.data) {
      const { field = "", operator = "", value = "" } = node.data;
      return (
        <div key={node.id} className="flex gap-2 items-center mb-4">
          <select
            value={field}
            onChange={(e) => dispatch({ type: "UPDATE_CONDITION", id: node.id, field: "field", value: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="">Field</option>
            <option value="price">Price</option>
            <option value="volume">Volume</option>
            <option value="market_cap">Market Cap</option>
          </select>

          <select
            value={operator}
            onChange={(e) => dispatch({ type: "UPDATE_CONDITION", id: node.id, field: "operator", value: e.target.value })}
            className="p-2 border border-gray-300 rounded-lg bg-white"
          >
            <option value="">Operator</option>
            <option value=">">{">"}</option>
            <option value="<">{"<"}</option>
            <option value="=">{"="}</option>
          </select>

          <input
            type="text"
            value={value}
            onChange={(e) => dispatch({ type: "UPDATE_CONDITION", id: node.id, field: "value", value: e.target.value })}
            placeholder="Value"
            className="p-2 border border-gray-300 rounded-lg bg-white w-24"
          />

          <button
            onClick={() => dispatch({ type: "REMOVE_NODE", id: node.id })}
            className="text-red-500 hover:text-red-700 font-semibold"
          >
            ✕
          </button>
        </div>
      );
    }

    if (node.type === "group") {
      return (
        <div key={node.id} className="border p-4 rounded-lg mb-4 bg-gray-50">
          <div className="flex items-center gap-4 mb-4">
            <select
              value={node.logic}
              onChange={(e) => dispatch({ type: "SET_LOGIC", id: node.id, logic: e.target.value as LogicType })}
              className="p-2 border border-gray-300 rounded-lg bg-white"
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>

            <button
              onClick={() => dispatch({ type: "ADD_CONDITION", parentId: node.id })}
              className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
            >
              + Add Rule
            </button>
            <button
              onClick={() => dispatch({ type: "ADD_GROUP", parentId: node.id, logic: "AND" })}
              className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              + AND Group
            </button>
            <button
              onClick={() => dispatch({ type: "ADD_GROUP", parentId: node.id, logic: "OR" })}
              className="px-2 py-1 bg-purple-500 text-white rounded hover:bg-purple-700"
            >
              + OR Group
            </button>

            {node.id !== tree.id && (
              <button
                onClick={() => dispatch({ type: "REMOVE_NODE", id: node.id })}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                ✕
              </button>
            )}
          </div>

          <div className="pl-4 border-l-2 border-gray-300 space-y-4">
            {node.children?.map((child) => renderNode(child))}
          </div>
        </div>
      );
    }

    return null;
  };

  return <div>{renderNode(tree)}</div>;
}
