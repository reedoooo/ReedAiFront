// Daily Traffic Dashboards Default

export const barChartDataDailyTraffic = [
  {
    name: 'Daily Traffic',
    data: [20, 30, 40, 20, 45, 50, 30],
  },
];

export const barChartOptionsDailyTraffic = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '12px',
      fontFamily: undefined,
    },
    onDatasetHover: {
      style: {
        fontSize: '12px',
        fontFamily: undefined,
      },
    },
    theme: 'dark',
  },
  xaxis: {
    categories: ['00', '04', '08', '12', '14', '16', '18'],
    show: false,
    labels: {
      show: true,
      colors: '#A3AED0',
      fontSize: '14px',
      fontWeight: '500',
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    color: 'black',
    labels: {
      colors: '#CBD5E0',
    },
  },
  grid: {
    strokeDashArray: 5,
    yaxis: {
      lines: {
        show: true,
      },
    },
    xaxis: {
      lines: {
        show: false,
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      type: 'vertical',
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      colorStops: [
        {
          offset: 0,
          color: '#4318FF',
          opacity: 1,
        },
        {
          offset: 100,
          color: 'rgba(67, 24, 255, 1)',
          opacity: 0.28,
        },
      ],
    },
  },
  dataLabels: {
    enabled: false,
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      columnWidth: '40px',
    },
  },
};

// Consumption Users Reports

export const barChartDataConsumption = [
  {
    name: 'PRODUCT A',
    data: [400, 370, 330, 390, 320, 350, 360, 320, 380],
  },
  {
    name: 'PRODUCT B',
    data: [200, 240, 250, 270, 220, 250, 260, 210, 230],
  },
  {
    name: 'PRODUCT C',
    data: [100, 150, 170, 190, 130, 160, 170, 120, 140],
  },
];

export const barChartOptionsConsumption = {
  chart: {
    stacked: true,
  },
  xaxis: {
    categories: ['17', '18', '19', '20', '21', '22', '23', '24', '25'],
  },
  grid: {
    borderColor: 'rgba(163, 174, 208, 0.3)',
  },
  fill: {
    opacity: 0.5,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '20px',
    },
  },
  colors: ['#5E37FF', '#6AD2FF', '#E1E9F8'],
  legend: {
    show: true,
  },
};

export const pieChartOptions = {
  labels: ['Your files', 'System', 'Empty'],
  colors: ['#4318FF', '#6AD2FF', '#EFF4FB'],
  states: {
    hover: {
      filter: {
        type: 'none',
      },
    },
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  dataLabels: {
    enabled: true,
  },
};

export const pieChartData = [63, 25, 12];

// Total Spent Default

export const lineChartDataTotalSpent = [
  {
    name: 'Revenue',
    data: [50, 64, 48, 66, 49, 68],
  },
  {
    name: 'Profit',
    data: [30, 40, 24, 46, 20, 46],
  },
];

export const lineChartOptionsTotalSpent = {
  chart: {
    dropShadow: {
      enabled: true,
      top: 13,
      left: 0,
      blur: 10,
      opacity: 0.1,
      color: '#4318FF',
    },
  },
  colors: ['#4318FF', '#39B8FF'],
  markers: {
    size: 0,
    colors: ['white'],
    strokeColors: '#7551FF',
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    shape: 'circle',
    radius: 2,
    offsetX: 0,
    offsetY: 0,
    showNullDataPoints: true,
  },
  stroke: {
    curve: 'smooth',
  },
  xaxis: {
    type: 'numeric',
    categories: ['SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB'],
  },
  plotOptions: {
    column: {
      color: ['#7551FF', '#39B8FF'],
    },
  },
};

export const tableColumnsCareerTracker = [
  { Header: 'COMPANY NAME', accessor: 'company_name' },
  { Header: 'APPLICATION DATA', accessor: 'application_data' },
  { Header: 'NOTES', accessor: 'notes' },
  { Header: 'SUBMITTED', accessor: 'submitted' },
  { Header: 'PROGRESS', accessor: 'progress' },
  { Header: 'STATUS', accessor: 'status' },
];
export const tableDataCareerTracker = [
  {
    company_name: ['Company A', true],
    application_data: [
      { icon: '📄', text: 'Resume' },
      { icon: '📄', text: 'Cover Letter' },
    ],
    notes: ['Note 1', false],
    submitted: '2024-05-01',
    progress: 80,
    status: 'In Progress',
  },
  {
    company_name: ['Company B', false],
    application_data: [{ icon: '📄', text: 'Resume' }],
    notes: ['Note 2', true],
    submitted: '2024-05-03',
    progress: 100,
    status: 'Approved',
  },
  {
    company_name: ['Company C', true],
    application_data: [{ icon: '📄', text: 'Portfolio' }],
    notes: ['Note 3', true],
    submitted: '2024-05-05',
    progress: 50,
    status: 'Pending',
  },
  {
    company_name: ['Company D', false],
    notes: ['Note 4', false],
    submitted: '2024-05-07',
    progress: 25,
    status: 'Rejected',
  },
];
export const careerTrackerTable = {
  columns: tableColumnsCareerTracker,
  data: tableDataCareerTracker,
};

export const chartConfigs = {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
  barChartDataConsumption,
  barChartOptionsConsumption,
  pieChartOptions,
  pieChartData,
  lineChartDataTotalSpent,
  lineChartOptionsTotalSpent,
};

export default chartConfigs;
