

// this is already a server component;

// an advantage of invoking a server action in a server component within a server component is progressive enhancement - best part is forms work even if javascript is disabled on the client;


export default function Page () {

    async function create(formData: FormData) {
        "use server"; //so this is gonna renderred on the server

        // now were gonna put the login inside to mutate the data;
    }

    return (
        <form action={create}>
            {/* here the form will be inside */}
        </form>
    )
}