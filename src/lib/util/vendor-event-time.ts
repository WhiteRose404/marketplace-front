export const getTheEventTime = (events: any[] | null, period: "7d" | "1m" | "3m") => (
    events?.filter((event) => {
        const orderDoneOn = new Date(event.created_at);
        const currentDate = new Date();
        // TO DO: custimze based on the period time we have setup
        return orderDoneOn.getTime() > currentDate.getTime() - 604800;
    })
)

export const getThePreviousEventTime = (events: any[] | null, period: "7d" | "1m" | "3m") => (
    events?.filter((event) => {
        const orderDoneOn = new Date(event.created_at);
        const currentDate = new Date();
        // TO DO: custimze based on the period time we have setup
        return orderDoneOn.getTime() - 604800 > currentDate.getTime() - 604800 * 2 && orderDoneOn.getTime() < currentDate.getTime() - 604800;
    })
)