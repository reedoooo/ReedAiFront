import {
  SplitScreen,
  SingleColumn,
  Fshape,
  Zshape,
  Cards,
  Dashboard,
  Hero,
  Blog,
  ProductGrid,
  NavWithDrawer,
  ColumnRight,
} from './components';

export const GenericLayouts = type =>
  ({
    splitScreen: <SplitScreen />,
    singleColumn: <SingleColumn />,
    fshape: <Fshape />,
    zshape: <Zshape />,
    cards: <Cards />,
    dashboard: <Dashboard />,
    hero: <Hero />,
    blog: <Blog />,
    productGrid: <ProductGrid />,
    navWithDrawer: <NavWithDrawer />,
    columnRight: <ColumnRight />,
  })[type] || <SingleColumn />;

const LayoutTypes = ({ layout }) => <>{GenericLayouts(layout)}</>;

export default LayoutTypes;
