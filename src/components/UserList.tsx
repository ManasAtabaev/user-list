import { Fragment, useState } from 'react';

import {
    MailIcon,
    PhoneIcon,
    GlobeAltIcon,
    HeartIcon,
    PencilIcon,
    TrashIcon,
} from '@heroicons/react/outline';

import { HeartIcon as SolidHeartIcon } from '@heroicons/react/solid';

type UserListProps = {
    data: any[];
};

const initialFavorites = () => {
    let favorites = localStorage.getItem('favorites');
    if (favorites) {
        return JSON.parse(favorites);
    }
    return [];
};

const initialNotes = () => {
    let notes = localStorage.getItem('notes');
    if (notes) {
        return JSON.parse(notes);
    }
    return [];
};

export default function UserList(props: UserListProps) {
    const [userList, setUserList] = useState(props.data);
    const [favorites, setFavorites] = useState(initialFavorites);
    const [showNotes, setShowNotes] = useState<any>(null);
    const [notes, setNotes] = useState(initialNotes);

    const addToFavorites = (userId: number) => {
        const temp = [...favorites];
        if (favorites.includes(userId)) {
            temp.splice(temp.indexOf(userId), 1);
        } else {
            temp.push(userId);
        }
        setFavorites(temp);
        localStorage.setItem('favorites', JSON.stringify(temp));
    };

    const showNotesForUser = (userId: number) => {
        let temp: any = userId;
        if (userId === showNotes) {
            temp = null;
        }
        setShowNotes(temp);
    };

    const setNoteForUser = (userId: number, value: string) => {
        const temp = [...notes];
        temp[userId] = value;
        setNotes(temp);
        localStorage.setItem('notes', JSON.stringify(temp));
    };

    const deleteUser = (userId: number) => {
        const temp = userList.filter((user) => user.id !== userId);
        setUserList(temp);
    };

    const favoriteIcon = (userId: number) => {
        if (favorites.includes(userId)) {
            return (
                <SolidHeartIcon className="h-5 w-5 text-red-500 inline-block" />
            );
        }
        return <HeartIcon className="h-5 w-5 text-red-500 inline-block" />;
    };

    return (
        <Fragment>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {userList.map((user) => (
                    <div
                        className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mr-4 mb-4"
                        key={user.id}
                    >
                        <img className="rounded-t-lg" src={user.avatar} />
                        <div className="p-5">
                            <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">
                                {user.name}
                            </h5>

                            <a
                                href={'mailto:' + user.email}
                                className="mb-3 text-sm text-gray-700 dark:text-gray-400 block"
                            >
                                <MailIcon className="h-5 w-5 text-gray-500 inline-block mr-2" />{' '}
                                {user.email}
                            </a>
                            <a
                                href={'tel:' + user.phone}
                                className="mb-3 text-sm text-gray-700 dark:text-gray-400 block"
                            >
                                <PhoneIcon className="h-5 w-5 text-gray-500 inline-block mr-2" />{' '}
                                {user.phone}
                            </a>
                            <a
                                href={'https://www.' + user.website}
                                target="blank"
                                className="mb-3 text-sm text-gray-700 dark:text-gray-400 block no-underline hover:underline-offset-1"
                            >
                                <GlobeAltIcon className="h-5 w-5 text-gray-500 inline-block mr-2" />{' '}
                                {user.website}
                            </a>
                        </div>

                        <div className="grid grid-cols-3 bg-gray-50 border-t">
                            <div className="text-center content-center border-r border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => addToFavorites(user.id)}
                                    className="w-full block m-0 py-2 px-4 text-sm font-medium text-gray-900 rounded hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                                >
                                    {favoriteIcon(user.id)}
                                </button>
                            </div>
                            <div className="text-center content-center border-r border-gray-200">
                                <button
                                    type="button"
                                    onClick={() => showNotesForUser(user.id)}
                                    className="w-full block m-0 py-2 px-4 text-sm font-medium text-gray-900 rounded hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                                >
                                    <PencilIcon className="h-5 w-5 text-gray-500 inline-block" />
                                </button>
                            </div>
                            <div className="text-center content-center">
                                <button
                                    type="button"
                                    onClick={() => deleteUser(user.id)}
                                    className="w-full block m-0 py-2 px-4 text-sm font-medium text-gray-900 rounded hover:bg-gray-100 hover:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                                >
                                    <TrashIcon className="h-5 w-5 text-gray-500 inline-block" />
                                </button>
                            </div>
                        </div>

                        <div
                            className={`p-2 ${
                                showNotes === user.id ? 'block' : 'hidden'
                            }`}
                        >
                            <textarea
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlTextarea1"
                                rows={3}
                                placeholder="Your message"
                                value={!notes[user.id] ? '' : notes[user.id]}
                                onChange={(e) =>
                                    setNoteForUser(
                                        user.id,
                                        e.currentTarget.value
                                    )
                                }
                            ></textarea>
                        </div>
                    </div>
                ))}
            </div>
        </Fragment>
    );
}
