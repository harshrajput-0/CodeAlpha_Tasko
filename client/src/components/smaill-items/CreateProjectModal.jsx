import { useState } from "react";
// import { CalendarDays, ChevronDown } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CreateProjectModal() {
  const [members, setMembers] = useState(["arcadem0000@gmail.com"]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create project here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-127.5">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl">Create New Project</DialogTitle>

          <DialogDescription>
            In workspace:{" "}
            <span className="font-medium text-blue-600">TS Components</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>

            <Input
              id="project-name"
              placeholder="Enter project name"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              placeholder="Describe your project"
              className="min-h-20 resize-y"
            />
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>

              <Select defaultValue="on-hold">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>

              <Select defaultValue="medium">
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Start + End Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>

              <Input id="start-date" type="date" className="w-full" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>

              <Input id="end-date" type="date" className="w-full" />
            </div>
          </div>

          {/* Project Lead */}
          <div className="space-y-2">
            <Label>Project Lead</Label>

            <Select defaultValue="none">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="none">No lead</SelectItem>
                <SelectItem value="harsh">Harsh Rajput</SelectItem>
                <SelectItem value="john">John Doe</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Members */}
          <div className="space-y-2">
            <Label>Team Members</Label>

            <Select
              onValueChange={(value) => {
                if (!members.includes(value)) {
                  setMembers([...members, value]);
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Add team members" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="arcadem0000@gmail.com">
                  arcadem0000@gmail.com
                </SelectItem>

                <SelectItem value="harsh@gmail.com">harsh@gmail.com</SelectItem>

                <SelectItem value="john@gmail.com">john@gmail.com</SelectItem>
              </SelectContent>
            </Select>

            {/* Selected members */}
            {members.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {members.map((email) => (
                  <div
                    key={email}
                    className="flex items-center gap-2 rounded-md bg-blue-100 px-2 py-1 text-sm text-blue-600"
                  >
                    <span>{email}</span>

                    <button
                      type="button"
                      onClick={() =>
                        setMembers(members.filter((member) => member !== email))
                      }
                      className="text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <DialogTrigger asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogTrigger>

            <Button type="submit">Create Project</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
