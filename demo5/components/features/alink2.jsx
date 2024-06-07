import Link from "next/link";
import { useRouter } from 'next/router';


export default function Alink({children, className, style, onClick, category,size, ...props}){
    const router = useRouter();

    function handleClick(e){    
        e.preventDefault();

        if(onClick){
            onClick(e);
        }
        if(category){
            router.push({
                pathname:'/shop/sidebar/3cols',
                query:{category:category}
            });
        }

        if(size){
            router.push({
                pathname:'/shop/sidebar/3cols',
                query:{size:size}
            });
        }
    }

    return (
        <Link {...props}>
            <a className={className} style={style} onClick={handleClick}>
                {children}
            </a>
        </Link>
    )
}