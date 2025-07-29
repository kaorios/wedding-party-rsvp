'use client';

import { useState } from 'react';
import { useRSVPForm } from './use-rsvp-form';
import {
  type AttendanceStatus,
  type MealOption,
} from '@/components/rsvp/schemas';

interface RSVPModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const attendanceOptions: Array<{ value: AttendanceStatus; label: string }> = [
  { value: '参加', label: '参加' },
  { value: '不参加', label: '不参加' },
];

const mealOptions: Array<{ value: MealOption; label: string }> = [
  { value: '一般', label: '一般' },
  {
    value: 'お子様用(3歳以上くらいから)',
    label: 'お子様用(3歳以上くらいから)',
  },
  { value: 'ビュッフェのみ', label: 'ビュッフェのみ' },
  { value: '不要', label: '不要' },
];

function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const {
    formData,
    isSubmitting,
    submitStatus,
    errorMessage,
    updateCompanionCount,
    updateCompanion,
    updateFormData,
    handleSubmit,
  } = useRSVPForm();

  const onSubmit = async (e: React.FormEvent) => {
    const success = await handleSubmit(e);
    if (success) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-warm-cream rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

          <form onSubmit={onSubmit} className="space-y-6">
            {/* 参加状況 */}
            <div>
              <label className="block text-warm-brown font-semibold mb-2">
                参加状況 <span className="text-warm-coral">*</span>
              </label>
              <div className="space-y-2">
                {attendanceOptions.map(({ value, label }) => (
                  <label key={value} className="flex items-center">
                    <input
                      type="radio"
                      name="attendance"
                      value={value}
                      checked={formData.attendance === value}
                      onChange={(e) =>
                        updateFormData({
                          attendance: e.target.value as AttendanceStatus,
                        })
                      }
                      className="mr-2"
                      required
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            {/* 基本情報 */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-warm-brown font-semibold mb-2">
                  お名前 <span className="text-warm-coral">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => updateFormData({ name: e.target.value })}
                  className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                  placeholder="お名前をご記入ください"
                />
              </div>
              <div>
                <label className="block text-warm-brown font-semibold mb-2">
                  ふりがな <span className="text-warm-coral">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.furigana}
                  onChange={(e) => updateFormData({ furigana: e.target.value })}
                  className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                  placeholder="ふりがなをご記入ください"
                />
              </div>
            </div>

            {/* アレルギー */}
            {formData.attendance === '参加' && (
              <div>
                <label className="block text-warm-brown font-semibold mb-2">
                  アレルギー
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) =>
                    updateFormData({ allergies: e.target.value })
                  }
                  className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                  rows={2}
                  placeholder="アレルギーがございましたらご記入ください"
                />
              </div>
            )}

            {/* お連れ様の人数 */}
            {formData.attendance === '参加' && (
              <div>
                <label className="block text-warm-brown font-semibold mb-2">
                  お連れ様の人数
                </label>
                <select
                  value={formData.companionCount}
                  onChange={(e) =>
                    updateCompanionCount(parseInt(e.target.value))
                  }
                  className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                >
                  <option value={0}>お一人での参加</option>
                  <option value={1}>1名</option>
                  <option value={2}>2名</option>
                  <option value={3}>3名</option>
                  <option value={4}>4名</option>
                  <option value={5}>5名</option>
                </select>
              </div>
            )}

            {/* お連れ様 */}
            {formData.attendance === '参加' &&
              (formData.companions || []).length > 0 && (
                <div>
                  <label className="block text-warm-brown font-semibold mb-4">
                    お連れ様の情報
                  </label>

                  {(formData.companions || []).map((companion, index) => (
                    <div
                      key={companion.id}
                      className="border border-warm-coral rounded-lg p-4 mb-4 bg-warm-cream-light"
                    >
                      <div className="mb-3">
                        <h4 className="text-warm-brown font-semibold">
                          お連れ様 {index + 1}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-warm-brown font-semibold mb-2">
                            お名前 <span className="text-warm-coral">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={companion.name}
                            onChange={(e) =>
                              updateCompanion(
                                companion.id,
                                'name',
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                            placeholder="お名前をご記入ください"
                          />
                        </div>
                        <div>
                          <label className="block text-warm-brown font-semibold mb-2">
                            ふりがな <span className="text-warm-coral">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={companion.furigana}
                            onChange={(e) =>
                              updateCompanion(
                                companion.id,
                                'furigana',
                                e.target.value
                              )
                            }
                            className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                            placeholder="ふりがなをご記入ください"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-warm-brown font-semibold mb-2">
                          アレルギー
                        </label>
                        <textarea
                          value={companion.allergies}
                          onChange={(e) =>
                            updateCompanion(
                              companion.id,
                              'allergies',
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                          rows={2}
                          placeholder="アレルギーがございましたらご記入ください"
                        />
                      </div>

                      <div>
                        <label className="block text-warm-brown font-semibold mb-2">
                          お料理について{' '}
                          <span className="text-warm-coral">*</span>
                        </label>
                        <select
                          value={companion.mealOption}
                          onChange={(e) =>
                            updateCompanion(
                              companion.id,
                              'mealOption',
                              e.target.value
                            )
                          }
                          className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                          required
                        >
                          {mealOptions.map(({ value, label }) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            {/* メッセージ */}
            <div>
              <label className="block text-warm-brown font-semibold mb-2">
                メッセージ
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => updateFormData({ message: e.target.value })}
                className="w-full p-3 border border-warm-coral rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-coral"
                rows={3}
                placeholder="ご要望などがあればご記入ください"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                ✅ 正常に送信されました！ありがとうございます。
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                ❌ エラーが発生しました: {errorMessage}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 border border-warm-coral text-warm-brown rounded-lg hover:bg-warm-cream-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className="flex-1 py-3 px-4 bg-warm-sage text-white rounded-lg hover:bg-warm-sage-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    送信中...
                  </>
                ) : submitStatus === 'success' ? (
                  '送信完了'
                ) : (
                  '送信'
                )}
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
