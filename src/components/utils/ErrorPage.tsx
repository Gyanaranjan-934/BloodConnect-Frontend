export default function ErrorPage({
    error,
}:{
    error?: any;
}) {
    return (
        <div className="flex justify-center items-center">
            <div className="m-4 p-4 shadow-md rounded-md">
                <h1 className="text-3xl font-semibold">Something went wrong</h1>
                <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
                    We are sorry, but something went wrong. Please <a className="underline font-semibold" href={window.location.href} >reload</a> the page.
                </p>
                {error && (
                    <p className="text-sm tracking-wide text-gray-600 dark:text-gray-300">
                        {JSON.stringify(error)}
                    </p>
                )}
            </div>
        </div>
    );
}
