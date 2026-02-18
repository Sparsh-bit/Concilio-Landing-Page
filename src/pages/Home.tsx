import { useEffect, useState, useCallback } from "react";
import OriginNavbar from "../components/OriginNavbar";
import PostSequence from "../components/PostSequence";
import { OriginHero } from "../components/OriginHero";
import { useLenisRef } from "../hooks/useLenis";

function Home() {
    const [isScrolled, setIsScrolled] = useState(false);
    const lenisRef = useLenisRef();

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 24);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/20">
            <OriginNavbar isScrolled={isScrolled} onScrollChange={setIsScrolled} lenisRef={lenisRef} />
            <main>
                <OriginHero onScrollChange={setIsScrolled} lenisRef={lenisRef} />
                <PostSequence />
            </main>
        </div>
    );
}

export default Home;
