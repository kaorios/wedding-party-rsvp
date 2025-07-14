'use client';

import { useState } from 'react';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('RSVP submitted:', formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-warm-cream rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading text-warm-brown">出欠確認</h2>
            <button
              onClick={onClose}
              className="text-warm-brown hover:text-warm-coral text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-warm-brown font-semibold mb-2">
                お名前 <span className="text-warm-coral">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                placeholder="お名前をご記入ください"
              />
            </div>

            <div>
              <label className="block text-warm-brown font-semibold mb-2">
                出席 <span className="text-warm-coral">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="出席"
                    checked={formData.attendance === '出席'}
                    onChange={(e) =>
                      setFormData({ ...formData, attendance: e.target.value })
                    }
                    className="mr-2"
                  />
                  出席
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attendance"
                    value="欠席"
                    checked={formData.attendance === '欠席'}
                    onChange={(e) =>
                      setFormData({ ...formData, attendance: e.target.value })
                    }
                    className="mr-2"
                  />
                  欠席
                </label>
              </div>
            </div>

            {formData.attendance === '出席' && (
              <div>
                <label className="block text-warm-brown font-semibold mb-2">
                  参加人数
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) =>
                    setFormData({ ...formData, guests: e.target.value })
                  }
                  className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                >
                  <option value="1">1名</option>
                  <option value="2">2名</option>
                  <option value="3">3名</option>
                  <option value="4">4名</option>
                </select>
              </div>
            )}

            {formData.attendance === '出席' && (
              <div>
                <label className="block text-warm-brown font-semibold mb-2">
                  食事制限・アレルギー
                </label>
                <textarea
                  value={formData.dietary}
                  onChange={(e) =>
                    setFormData({ ...formData, dietary: e.target.value })
                  }
                  className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                  rows={3}
                  placeholder="食事制限やアレルギーがございましたらご記入ください"
                />
              </div>
            )}

            <div>
              <label className="block text-warm-brown font-semibold mb-2">
                メッセージ
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                rows={3}
                placeholder="お祝いのメッセージをお聞かせください"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-4 border border-warm-coral text-warm-brown rounded-lg hover:bg-warm-cream-light transition-colors"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-warm-sage text-white rounded-lg hover:bg-warm-sage-dark transition-colors"
              >
                送信
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function RSVPModalComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="text-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-warm-sage text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-warm-sage-dark transition-colors shadow-lg border-2 border-warm-sage-dark hover:border-warm-sage"
        >
          回答する
        </button>
      </div>

      <RSVPModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
