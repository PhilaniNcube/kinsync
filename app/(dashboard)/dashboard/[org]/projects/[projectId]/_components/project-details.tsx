"use client";

import { useOptimistic, useState } from "react";
import { Calendar, Download, FileText, Image as ImageIcon } from "lucide-react";
import { format, set } from "date-fns";
import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import type { Database } from "@/utils/types/schema";
import CreateTaskDialog from "./create-task-dialog";
import { formatCurrency } from "@/lib/utils";
import { completeTaskAction } from "@/utils/server-actions/tasks/complete-task";
import DocumentUploadModal from "./upload-document";
import ImageUploadModal from "./upload-image-modal";
import Link from "next/link";

type Props = {
  projectInfo: Database["public"]["Tables"]["projects"]["Row"];
  tasks: Database["public"]["Tables"]["project_tasks"]["Row"][];
  images: Database["public"]["Tables"]["project_images"]["Row"][] | null;
  documents: Database["public"]["Tables"]["project_documents"]["Row"][] | null;
};

type Task = Database["public"]["Tables"]["project_tasks"]["Row"];

export default function ProjectDetails({
  projectInfo,
  tasks,
  documents,
  images,
}: Props) {
  const [project, setProject] = useState(projectInfo);

  const [optimisticTasks, setOptimisticTasks] = useOptimistic<Task[], Task>(
    tasks,
    (state, updatedTask) => {
      // find the updated task in the state and update it
      return state.map((task) => {
        if (task.id === updatedTask.id) {
          return {
            ...task,
            completed: updatedTask.completed === true,
          };
        }
        return task;
      });
    }
  );

  const totalCost = optimisticTasks.reduce((sum, task) => sum + task.cost, 0);
  const completedTasks = optimisticTasks.filter(
    (task) => task.completed
  ).length;
  const progress = (completedTasks / optimisticTasks.length) * 100;

  return (
    <div className="container p-6 mx-auto space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-3xl font-bold">
                {projectInfo.name}
              </CardTitle>
              <CardDescription className="mt-2">
                {projectInfo.description}
              </CardDescription>
            </div>
            <Badge variant="outline" className="hidden text-sm md:block">
              {progress.toFixed(0)}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4 space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center text-xs">
              <Calendar className="hidden w-4 h-4 mr-2 md:block" />
              Start: {format(projectInfo.start_date, "MMM d, yyyy")}
            </div>
            <div className="flex items-center text-xs">
              <Calendar className="hidden w-4 h-4 mr-2 md:block" />
              End:{" "}
              {projectInfo.end_date &&
                format(projectInfo.end_date, "MMM d, yyyy")}
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-col justify-between md:flex-row md:items-center">
          <CardTitle>Project Tasks</CardTitle>
          <CreateTaskDialog
            tenant_id={projectInfo.tenant_id}
            project_id={projectInfo.id}
          />
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {optimisticTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
              >
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={(checked) => {
                      console.log(checked);
                      setOptimisticTasks({
                        ...task,
                        completed: checked === true,
                      });

                      completeTaskAction(
                        checked === true,
                        task.id,
                        projectInfo.tenant_id,
                        projectInfo.id
                      );
                    }}
                  />
                  <span
                    className={
                      task.completed ? "line-through text-muted-foreground" : ""
                    }
                  >
                    {task.description}
                  </span>
                </div>
                <Badge variant="secondary">
                  {task.cost && formatCurrency(task.cost)}
                </Badge>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-semibold text-right">
            Total Cost:{" "}
            {formatCurrency(tasks.reduce((sum, task) => sum + task.cost, 0))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="@container">
          <CardHeader className="flex flex-col @md:items-center  @md:flex-row justify-between">
            <CardTitle>Project Documents</CardTitle>
            <DocumentUploadModal projectId={project.id} />
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {documents &&
                documents.map((doc) => (
                  <li key={doc.id} className="flex items-center space-x-2">
                    <FileText className="w-12 h-12" />
                    <span className="line-clamp-1">{doc.description}</span>
                    <Link href={`${doc.document_url}`}>
                      <Button variant="ghost" size="sm">
                        <Download className="w-6 h-6 text-blue-600" />
                      </Button>
                    </Link>
                  </li>
                ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="@container">
          <CardHeader className="flex flex-col @md:items-center  @md:flex-row justify-between">
            <CardTitle>Project Images</CardTitle>
            <ImageUploadModal projectId={project.id} />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {images &&
                images.map((image) => (
                  <div key={image.id} className="space-y-2">
                    <Image
                      src={image.image_url}
                      alt={image.image_url}
                      width={200}
                      height={100}
                      className="object-cover rounded-lg"
                    />
                    <p className="text-sm text-center">{image.description}</p>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
