import { Fragment, useState } from 'react';
import MainMenu from './../../components/MainMenu';
import UserList from './../../components/UserList';
import Loader from './../../components/Loader';
import useDataApi from './../../hooks/useDataApi';

export default function HomePage() {
    const [query, setQuery] = useState('');
    const [state, doFetch] = useDataApi(
        {
            name: query,
        },
        []
    );

    function changeQuery(value: string) {
        console.log('setFilte');
        setQuery(value);
        if (value.length > 3 || value.length === 0) {
            doFetch({ name: value });
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
                                    Users
                                </h1>
                            </div>
                            <div>
                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-green-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                        id="grid-query"
                                        type="text"
                                        placeholder="Search By Full Name"
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
                            <UserList data={state.data} />
                        )}
                    </div>
                </main>
            </div>
        </Fragment>
    );
}
