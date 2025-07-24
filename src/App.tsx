import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import TextToImage from "@/pages/TextToImage";
import TextToVideo from "@/pages/TextToVideo";
import ImageToVideo from "@/pages/ImageToVideo";
import FrameToVideo from "@/pages/FrameToVideo";
import Gallery from "@/pages/Gallery";
import AIKnowledge from "@/pages/AIKnowledge";
import Layout from "@/components/Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/text-to-image" element={<TextToImage />} />
          <Route path="/text-to-video" element={<TextToVideo />} />
          <Route path="/image-to-video" element={<ImageToVideo />} />
          <Route path="/frame-to-video" element={<FrameToVideo />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/ai-knowledge" element={<AIKnowledge />} />
        </Routes>
      </Layout>
      <Toaster position="top-right" richColors />
    </Router>
  );
}
