type Props = {
    params: { productId: string };
};

export default function ProductDetail({ params }:Props) {
    return (
        <div>
            {params.productId}
        </div>
    )
}