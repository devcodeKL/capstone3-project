import Banner from '../components/Banner';

export default function Error() {

    const data = {
        title: "Oops! Something went wrong",
        content: "The page you're looking for may have been removed, had its name changed, or is temporarily unavailable.",
        destination: "/",
        label: "Take me back to home"
    }
    
    return (
        <Banner data={data}/>
    )
}