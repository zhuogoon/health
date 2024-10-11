import React, { useState, useEffect } from "react";
import { Item } from "@/components/table/columns"; // 调整路径

interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  onUpdate: (updatedItem: Item) => void;
}

const EditNameModal: React.FC<EditNameModalProps> = ({
  isOpen,
  onClose,
  item,
  onUpdate,
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (item) {
      setName(item.name); // 设置初始值
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onUpdate({ ...item, name });
      onClose(); // 关闭模态框
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl mb-4">编辑项目名称</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">项目名称</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg w-full p-2"
            />
          </div>
          <div className="space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 rounded-lg p-2"
            >
              取消
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg p-2"
            >
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNameModal;
