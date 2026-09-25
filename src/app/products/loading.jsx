import Loader from "@/components/Loader";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto p-6">
            <Loader message="Fetching product listing..." />
        </div>
    );
}