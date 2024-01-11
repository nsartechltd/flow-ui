type HeaderProps = {
  padding?: string;
};

export const Header = ({ padding }: HeaderProps): JSX.Element => {
  return (
    <header className={`${padding}`}>
      <div className="container mx-auto flex justify-center">
        <h1 className="text-white text-7xl font-semibold">Flow</h1>
      </div>
    </header>
  );
};
