import { productsType } from "@/types/productsType"

type Props = {
    item: productsType
    onClick: (key: any) => void
    locked: boolean
    img?: string


}

export const CartList = ({ item, onClick, locked, img }: Props) => {

    return (
        <>
            <ul>
                {item.qtd !== 0 &&
                    <li className="mb-4 flex items-center justify-between border-b border-black/10 pb-3 ">

                        <div className=" flex">
                            {locked &&

                                <img className="w-16 rounded-md mr-3" src={img} alt="" />
                            }

                            <div >

                                <h2 className="text-black font-bold">{item.title}</h2>
                                <div className="flex gap-3 w-full">
                                    <p className="font-bold">${item.qtd}x</p>
                                    <p className="text-black/40" >@${item.price}</p>
                                    <p className="text-black/60">R${(item.price * item.qtd).toFixed(2)}</p>
                                </div>

                            </div>
                        </div>


                        <button className={locked ? 'hidden' : 'block mt-6'} onClick={() => onClick(item.title)}>
                            <img className="border border-black/20 rounded-full p-0.5" src="/images/icon-remove-item.svg" alt="" />
                        </button>

                    </li>
                }
            </ul>

        </>
    )
}