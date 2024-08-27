import { getProjectByID, getProjectTasks } from "@/utils/data/projects";
import ProjectDetails from "./_components/project-details";

const ProjectPage = async ({params:{projectId}}:{params:{projectId:string}}) => {

  const projectData =  getProjectByID(projectId);
  const projectTaskData =  getProjectTasks(projectId);

  const [ project, projectTasks] = await Promise.all([ projectData, projectTaskData]);

  return (
			<div className="px-6 py-4">
				<ProjectDetails projectInfo={project} tasks={projectTasks} />
			</div>
		);
};
export default ProjectPage;
