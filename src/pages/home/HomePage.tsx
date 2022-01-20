import React, { Fragment, useState } from 'react';
import MainMenu from './../../components/MainMenu';
import DataTable from './../../components/DataTable';
import Loader from './../../components/Loader';
import useDataApi from './../../hooks/useDataApi';

export default function HomePage() {
    const [query, setQuery] = useState('redux');
    const [state, doFetch] = useDataApi(
        {
            query: query,
        },
        {
            hits: [],
        }
    );

    function changeQuery(value: string) {
        setQuery(value);
        if (value.length > 3) {
            doFetch({ query: value });
        }
    }

    return (
        <Fragment>
            <div className="min-h-full">
                <MainMenu />

                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">
                                    Dashboard
                                </h1>
                            </div>
                            <div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-query"
                                        type="text"
                                        placeholder="Search"
                                        value={query}
                                        onChange={(e) =>
                                            changeQuery(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        {state.isError && <div>Something went wrong ...</div>}

                        {state.isLoading && <Loader />}

                        {!state.isError && !state.isLoading && (
                            <DataTable data={state.data.hits} />
                        )}
                    </div>
                </main>
            </div>
        </Fragment>
    );
}
