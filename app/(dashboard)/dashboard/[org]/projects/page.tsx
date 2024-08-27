import { getGroupProjects, searchProjects } from "@/utils/data/projects";
import ProjectsPageSearch from "./_components/projects-page-search";
import { Separator } from "@/components/ui/separator";
import ProjectSummaryCard from "../../_components/project-summary-card";

const ProjectsPage = async ({params:{org}, searchParams}:{params:{org:string}, searchParams:{search:string}}) => {

  const projects = await searchProjects(org, searchParams.search);

  return <div className="px-6 py-4">
    <ProjectsPageSearch group_id={org} />
    <Separator className="my-3" />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <ProjectSummaryCard key={project.id} project={project} />
      ))}
    </div>
  </div>;
};
export default ProjectsPage;
