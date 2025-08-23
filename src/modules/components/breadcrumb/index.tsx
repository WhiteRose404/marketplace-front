import Link from "next/link";

const Breadcrumb = ({ tabs }: { tabs: { value: string; href: string }[] }) => {
    return (
        <div className="pr-8 py-4 text-sm text-gray-500">
            {tabs.map(({ value, href }, index) => (
                <>
                    <Link  href={href} className={index === tabs.length - 1 ? "text-gray-900" : `hover:underline`}>{value}</Link>
                    {(index !== tabs.length - 1) && <span className="mx-2">/</span>}
                </>
            ))}
        </div>
    );
}

export default Breadcrumb;