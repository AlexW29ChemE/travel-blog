import Container from "./Container";
import DateFormatter from "./DateFormatter";

const lastModified = new Date();
export function Footer() {

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 py-4">
      <Container>
        <div className="flex flex-row items-center justify-between">
          <div className="text-center lg:text-left mb-2 lg:mb-0">
            <h3 className="text-lg font-bold">Travelling with Alex</h3>
          </div>
          <div className="text-center mb-2 lg:mb-0">
            <p className="text-sm">Last modified: <DateFormatter date={lastModified}/></p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
