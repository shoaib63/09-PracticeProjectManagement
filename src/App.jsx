import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";


function App() {

  const [projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: []
  });

  function handleAddTask(text) {
    setProjectState(prev => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prev.selectedProjectId,
        id: taskId,
      }
      return {
        ...prev,
        // selectedProjectId: undefined,
        tasks: [newTask, ...prev.tasks]
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectState(prev => {
      return {
        ...prev,
        tasks: prev.tasks.filter((task) => task.id !== id)
      };
    })
  }

  function handleDeleteProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: prev.projects.filter((project) => project.id !== prev.selectedProjectId)
      };
    })
  }

  function handleSelectProject(id) {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: id,
      };
    })
  }

  function handleStartAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    })
  }

  function handleCancelAddProject() {
    setProjectState(prev => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    })
  }

  function handleAddProject(projectData) {
    setProjectState(prev => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      }
      return {
        ...prev,
        selectedProjectId: undefined,
        projects: [...prev.projects, newProject]
      }
    })
  }



  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  let content = <SelectedProject
    project={selectedProject}
    onDelete={handleDeleteProject}
    onAddTask={handleAddTask}
    onDeleteTask={handleDeleteTask}
    tasks={projectState.tasks.filter(item => item.projectId === projectState.selectedProjectId)}
  />

  if (projectState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  }
  else if (projectState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8 ">
      <ProjectSidebar onStartAddProject={handleStartAddProject}
        projects={projectState.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
