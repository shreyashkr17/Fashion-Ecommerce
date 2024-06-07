import Link from "next/link";

export default function ALink ( { children, className, style, ...props } ) {
    function defaultFunction ( e ) {
        if ( props.href == '#' ) {
            e.preventDefault();
        }
    }

    return (
        <Link { ...props }>
            <a className={ className } style={ style } onClick={ defaultFunction }>
                { children }
            </a>
        </Link>
    )
}