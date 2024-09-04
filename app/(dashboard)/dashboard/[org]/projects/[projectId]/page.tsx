import { getProjectByID, getProjectTasks } from "@/utils/data/projects";
import ProjectDetails from "./_components/project-details";
import { getProjectDocuments, getProjectImages } from "@/utils/data/files";

const ProjectPage = async ({params:{projectId}}:{params:{projectId:string}}) => {

  const projectData =  getProjectByID(projectId);
  const projectTaskData =  getProjectTasks(projectId);
  const projectImageData =  getProjectImages(projectId);
  const projectDocumentData =  getProjectDocuments(projectId);

  const [ project, projectTasks, projectDocuments, projectImages] = await Promise.all([ projectData, projectTaskData, projectDocumentData, projectImageData]);

  return (
			<div className="px-6 py-4">
				<ProjectDetails projectInfo={project} tasks={projectTasks} images={projectImages} documents={projectDocuments} />
			</div>
		);
};
export default ProjectPage;
