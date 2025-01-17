import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from '../commonStyles/commonStyles.module.css';

type PreviewImage = {
    url: string;
    name: string;
};

const AboutPage: React.FC = () => {
    const [aboutHeading, setAboutHeading] = useState<string>('');
    const [aboutDescription, setAboutDescription] = useState<string>('');
    const [adDate, setAdDate] = useState<string>('');
    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        const newPreviewImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            name: file.name,
        }));

        setSelectedImages((prev) => [...prev, ...files]);
        setPreviewImages((prev) => [...prev, ...newPreviewImages]);
    };

    const removeImage = (index: number): void => {
        const newSelectedImages = selectedImages.filter((_, i) => i !== index);
        const newPreviewImages = previewImages.filter((_, i) => i !== index);

        URL.revokeObjectURL(previewImages[index].url);

        setSelectedImages(newSelectedImages);
        setPreviewImages(newPreviewImages);
    };

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        console.log({
            aboutHeading,
            aboutDescription,
            adDate,
            images: selectedImages,
        });
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>About Page</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="aboutHeading" className={styles.label}>
                            About Heading
                        </label>
                        <input
                            id="aboutHeading"
                            className={styles.input}
                            value={aboutHeading}
                            onChange={(e) => setAboutHeading(e.target.value)}
                            placeholder="Enter about heading"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="aboutDescription" className={styles.label}>
                            About Description
                        </label>
                        <textarea
                            id="aboutDescription"
                            className={`${styles.input} ${styles.textArea}`}
                            value={aboutDescription}
                            onChange={(e) => setAboutDescription(e.target.value)}
                            placeholder="Enter about description"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="adDate" className={styles.label}>
                            Date
                        </label>
                        <input
                            id="adDate"
                            className={styles.input}
                            type="date"
                            value={adDate}
                            onChange={(e) => setAdDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Upload Images</label>
                        <div className={styles.uploadArea}>
                            <input
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ visibility: 'hidden' }}
                                id="image-upload"
                            />
                            <label htmlFor="image-upload">
                                <div className={styles.uploadIcon}>+</div>
                                <p className={styles.uploadText}>Click to upload images</p>
                            </label>
                        </div>
                    </div>

                    {previewImages.length > 0 && (
                        <div className={styles.imageGrid}>
                            {previewImages.map((image, index) => (
                                <div key={index} className={styles.imageCard}>
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className={styles.removeButton}
                                    >
                                        ×
                                    </button>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={image.url}
                                            alt={`Preview ${index + 1}`}
                                            className={styles.image}
                                        />
                                        <p className={styles.fileName}>{image.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>
                    Create About Section
                </button>
            </form>
        </div>
    );
};

export default AboutPage;
