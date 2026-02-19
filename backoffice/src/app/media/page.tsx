import { Upload, Image as ImageIcon } from 'lucide-react';

export default function MediaPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media</h1>
          <p className="text-gray-600">Beheer afbeeldingen en bestanden</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Upload size={20} />
          Upload
        </button>
      </div>

      <div className="card p-12 text-center">
        <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Nog geen media</h3>
        <p className="text-gray-500 mb-4">
          Upload afbeeldingen en bestanden om ze in je artikels te gebruiken.
        </p>
        <p className="text-sm text-gray-400">
          Tip: Je kunt ook rechtstreeks een URL invoeren bij het aanmaken van een artikel.
        </p>
      </div>
    </div>
  );
}
