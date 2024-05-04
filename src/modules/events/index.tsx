import { EventProvider } from "./EventContext";
import EventMainPage from "./EventMainPage";

const Index = () => {
    return (
        <EventProvider>
            <EventMainPage/>
        </EventProvider>
    );
};

export default Index;
