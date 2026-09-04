import { PortableText, type PortableTextComponents } from 'next-sanity';
import type { PortableTextBlock } from 'sanity';
import { fullBioPageQuery } from '@/lib/queries';
import { sanityFetch } from '@/lib/sanity';

interface BioPageData {
	bio: {
		fullBio: PortableTextBlock[];
	} | null;
}

export const revalidate = 3600;

const portableTextComponents: PortableTextComponents = {
	block: {
		normal: ({ children }) => (
			<p className="p-5 mb-6 text-lg leading-relaxed sm:text-xl">{children}</p>
		),
		h2: ({ children }) => (
			<h2 className="mb-4 mt-12 font-[family-name:var(--font-virtual-realm)] text-3xl sm:text-4xl">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="mb-3 mt-8 text-2xl font-bold">{children}</h3>
		),
		blockquote: ({ children }) => (
			<blockquote className="my-10 border-l-4 border-current pl-6 text-2xl italic leading-snug">
				{children}
			</blockquote>
		),
	},
	marks: {
		strong: ({ children }) => <strong className="font-bold">{children}</strong>,
		em: ({ children }) => <em className="italic">{children}</em>,
		link: ({ children, value }) => (
			<a
				href={value?.href}
				className="underline underline-offset-4"
				target="_blank"
				rel="noreferrer"
			>
				{children}
			</a>
		),
	},
	list: {
		bullet: ({ children }) => (
			<ul className="my-6 list-disc space-y-2 pl-6">{children}</ul>
		),
		number: ({ children }) => (
			<ol className="my-6 list-decimal space-y-2 pl-6">{children}</ol>
		),
	},
};

export default async function BioPage() {
	const cms = await sanityFetch<BioPageData>(fullBioPageQuery);
	const fullBio = cms?.bio?.fullBio;

	return (
		<div 
            style={{
                minHeight:"screen",
                width:"100vw",
                height:"100%",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
				background: '#bec927',
				
            }}>
			<div className="my-5 mx-auto max-w-xl"
                        style={{
                
                width:"50vw",
				padding:"10vh 0 0 0" 
            }}
            >
				<h1 
                style={{
                fontFamily:"var(--font-virtual-realm)",
                color:'#ee6513'      
            }}>
					Bio
				</h1>
				{fullBio?.length ? (
					<div>
						<PortableText value={fullBio} components={portableTextComponents} />
					</div>
				) : (
					<p className="text-lg">Bio coming soon.</p>
				)}
			</div>
		</div>
	);
}
