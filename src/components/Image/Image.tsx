import { PropsWithChildren } from 'react';

export type BackgroundImageProps = {
  url: string;
};

export const BackgroundImage = ({
  url,
  children,
}: PropsWithChildren<BackgroundImageProps>): JSX.Element => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat top-0 left-0 h-screen w-screen"
      style={{ backgroundImage: `url(${url})` }}
    >
      {children}
    </div>
  );
};
