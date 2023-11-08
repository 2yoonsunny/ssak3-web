type Props = {
    params: { reviewId: string };
};

export default function reviewDetail({ params }:Props) {
    return (
        <div>
            {params.reviewId}
        </div>
    )
}