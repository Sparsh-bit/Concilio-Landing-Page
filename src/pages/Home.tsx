import { useEffect, useState } from "react";
import OriginNavbar from "../components/OriginNavbar";
import PostSequence from "../components/PostSequence";
import { OriginHero } from "../components/OriginHero";

function Home() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 24);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            <OriginNavbar isScrolled={isScrolled} onScrollChange={setIsScrolled} />
            <main>
                <OriginHero onScrollChange={setIsScrolled} />
                <PostSequence />
            </main>
        </div>
    );
}

export default Home;
