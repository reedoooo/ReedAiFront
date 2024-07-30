import { MdAddTask } from 'react-icons/md';

export const miniStatisticsData = {
  interviewsEarned: {
    name: 'Interviews Earned',
    value: 10,
    icon: <MdAddTask />,
  },
  responsesBack: { name: 'Responses Back', value: 15, icon: <MdAddTask /> },
  rejectionRatio: {
    name: 'Rejection Ratio',
    value: '3:1',
    icon: <MdAddTask />,
  },
  jobsAppliedThisWeek: {
    name: 'Jobs Applied This Week',
    value: 7,
    icon: <MdAddTask />,
  },
  followUpsSent: { name: 'Follow-ups Sent', value: 5, icon: <MdAddTask /> },
};

export const statsConfig = {
  miniStatisticsData,
};

export default statsConfig;
