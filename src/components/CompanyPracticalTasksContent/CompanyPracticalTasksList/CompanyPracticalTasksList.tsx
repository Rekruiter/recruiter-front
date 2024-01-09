import PracticalTaskListItem from '@/components/PublicPracticalTasksContent/PublicPracticalTasksList/PracticalTaskListItem';
import Spinner from '@/components/UI/Spinner/Spinner';
import { defaultStyles } from '@/constants/defaultStyles';
import { Paths } from '@/constants/paths';
import { cn } from '@/lib/utils';
import { IPublicPracticalTask } from '@/types/tasksTypes';
import { Link } from 'react-router-dom';

interface CompanyPracticalTasksListProps {
  tasks: IPublicPracticalTask[];
  isFetching: boolean;
}

const CompanyPracticalTasksList = ({ isFetching, tasks }: CompanyPracticalTasksListProps) => {
  return (
    <div className="flex flex-col gap-1 rounded-b-xl p-8 md:px-12 lg:px-16">
      <Link to={Paths.addPracticalTask.path} className={cn(defaultStyles.orangeButton, 'w-fit place-self-center')}>
        Add practical task
      </Link>
      <h3 className="mb-4 text-2xl font-semibold text-dark">Your tasks</h3>
      <div className="flex w-full flex-col gap-2 rounded-md p-4">
        {isFetching ? (
          <Spinner />
        ) : (
          tasks.map((task) => (
            <PracticalTaskListItem
              key={task.id}
              id={task.id}
              question={task.question}
              difficultyLevel={task.difficultyLevel}
              practicalTasksSolutions={task.practicalTaskSolutions}
              to="" // TODO: add here navigation to edit task
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CompanyPracticalTasksList;
