import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Plus, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Create a base instance of axios with the environment variable
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    completed: false,
  });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/tasks");
      setTasks(response.data.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    if (!newTask.title.trim()) {
      alert("Title is required");
      return;
    }
    try {
      const response = await api.post("/api/tasks", newTask);
      setTasks([response.data.data, ...tasks]);
      setNewTask({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await api.put(`/api/tasks/${id}`, updatedTask);
      setTasks(
        tasks.map((task) => (task._id === id ? response.data.data : task))
      );
      setEditingTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleEditTask = (task) => {
    setEditingTask({ ...task });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Task Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full"
            />
            <Textarea
              placeholder="Task Description (Optional)"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full"
            />
            <Button onClick={createTask} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Task
            </Button>
          </CardContent>
        </Card>

        {loading ? (
          <div className="text-center text-gray-500">Loading tasks...</div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task._id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-4">
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() =>
                        updateTask(task._id, {
                          ...task,
                          completed: !task.completed,
                        })
                      }
                    />
                    <div>
                      <h3
                        className={`text-lg font-medium ${
                          task.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className="text-sm text-gray-500">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEditTask(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => deleteTask(task._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Edit Task Dialog */}
        {editingTask && (
          <Dialog
            open={!!editingTask}
            onOpenChange={() => setEditingTask(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Task</DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        title: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="completed" className="text-right">
                    Completed
                  </Label>
                  <Checkbox
                    id="completed"
                    checked={editingTask.completed}
                    onCheckedChange={(checked) =>
                      setEditingTask({
                        ...editingTask,
                        completed: checked,
                      })
                    }
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  onClick={() => updateTask(editingTask._id, editingTask)}
                >
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default App;
