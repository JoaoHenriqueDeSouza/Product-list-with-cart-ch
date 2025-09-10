

type Props = {
    image: string;
    group: string;
    title: string;
    price: number;
    qtd: number;
    onClick: () => void;
    onClickRemove: ()=>void
    addTotal: ()=> void
}
export const MenuItem = ({ image, group, title, price, onClick, onClickRemove, qtd, addTotal }: Props) => {



    return (
        <li className="max-w-96 rounded-md overflow-hidden">
            <img className={`rounded-md lg:w-60 ${qtd>0&& 'border-2 border-red-500' }`} src={image} alt="" />

            <div className="flex justify-center -mt-4 mb-3">
                {qtd <= 0
                    ?
                    <button onClick={onClick} className="bg-white rounded-full w-40 py-2 px-4 flex justify-center border border-[color:hsl(14,86%,42%)] cursor-pointer">
                        <img className="mr-2" src="/images/icon-add-to-cart.svg" alt="" />
                        <p className="text-black font-bold">Add Item</p>
                        
                    </button>
                    :
                    <div className="bg-[color:hsl(14,86%,42%)] text-white rounded-full w-36  px-4 flex justify-between items-center">
                        <button className=" cursor-pointer text-4xl" onClick={onClickRemove}>-</button>
                        {qtd}                        
                        <button className=" cursor-pointer text-2xl" onClick={onClick}>+</button>
                    </div>

                }

            </div>

            <div className="flex flex-col justify-center">
                <p className="text-black/40" >{group}</p>
                <p className="text-black font-bold">{title}</p>
                <div className="font-bold" >$ {price.toFixed(2)}</div>
            </div>
        </li>
    )

}