import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { Card } from "./ui/card";

export function ContactCTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send to a backend
    alert("Thanks for reaching out! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890?text=Hi, I'm interested in your web services", "_blank");
  };

  return (
    <section id="contact" className="py-20 px-6 bg-linear-to-b from-blue-600 to-blue-800 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Let's build a website that brings you customers. Get in touch today for a free consultation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-white text-gray-900">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold">Send us a message</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full"
                />
              </div>

              <div>
                <Textarea
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full min-h-32"
                />
              </div>

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </Button>
            </form>
          </Card>

          {/* WhatsApp CTA */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Or chat with us instantly</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Prefer a quick conversation? Message us on WhatsApp and get answers to your questions right away.
              </p>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>

            <div className="border-t border-blue-500 pt-6">
              <p className="text-blue-100 text-sm">
                <strong className="text-white">Response time:</strong> Usually within 24 hours
              </p>
              <p className="text-blue-100 text-sm mt-2">
                <strong className="text-white">Free consultation:</strong> No obligations, just honest advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
