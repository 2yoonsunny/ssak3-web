type Props = {
    params: { memberId: string };
};

export default function memberDetail({ params }:Props) {
    return (
        <div>
            {params.memberId}
        </div>
    )
}