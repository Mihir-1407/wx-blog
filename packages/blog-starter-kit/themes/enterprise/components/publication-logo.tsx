import { resizeImage } from '@starter-kit/utils/image';
import Link from 'next/link';
import { PublicationFragment } from '../generated/graphql';
import { useAppContext } from './contexts/appContext';

const getPublicationLogo = (publication: PublicationFragment, isSidebar?: boolean) => {
	if (isSidebar) {
		return publication.preferences.logo; // Always display light mode logo in sidebar
	}
	return publication.preferences.darkMode?.logo || publication.preferences.logo;
};

export const PublicationLogo = ({ isSidebar }: { isSidebar?: boolean }) => {
	const { publication } = useAppContext();
	const PUBLICATION_LOGO = getPublicationLogo(publication, isSidebar);

	return (
		<h1 className="relative w-full">
			<Link
				href={'/'}
				aria-label={`${publication.title} blog home page`}
				className="flex flex-row items-center justify-center gap-3"
			>
				{PUBLICATION_LOGO ? (
					<>
						<img
							className="block w-32 shrink-0 md:w-60"
							alt={publication.title}
							src={resizeImage(PUBLICATION_LOGO, { w: 500, h: 140 })}
						/>
						<span className="text-2xl font-semibold text-black md:text-3xl">Blog</span>
					</>
				) : (
					<span
						className={`block text-2xl font-semibold ${
							isSidebar ? 'text-black dark:text-white' : 'text-white md:text-4xl'
						}`}
					>
						{publication.title}
					</span>
				)}
			</Link>
		</h1>
	);
};
