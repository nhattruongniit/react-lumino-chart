import React from 'react';
import { useSelector } from 'react-redux';

// module
import ChartEditor from 'modules/ChartEditor';

// components
import Loading from 'components/Loading';
import Header from 'components/Header';

// selectors
import { isLoadingSelector } from 'selectors/app.selector';

// mockData
import { variables, dataPieChart } from 'mocks/mockData';

// run localhost
export const APP_ENV = process.env.REACT_APP_ENV; // run addon
export const APP_MOCK_DATA = {
  variables,
  dataPieChart
}

function App() {
  const isLoading = useSelector(isLoadingSelector);

  return (
    <>
      {isLoading && <Loading />}

      <div className="container">
        <Header />
        <main>
          <ChartEditor />
        </main>
      </div>
    </>
  );
}

export default App;
