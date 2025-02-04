import React from "react";
import { useMenu } from "../../contexts/MenuContext";
import { useTranslation } from "react-i18next";
import LazyImage from "../LazyImage";

interface CategoriesProps {
    expandedCategories: any[];
    setExpandedCategories: (categories: string[]) => void;
}

const Categories = ({
    expandedCategories,
    setExpandedCategories,
}: CategoriesProps) => {
    const { menu } = useMenu();

    const { t } = useTranslation();

    const toggleCategory = (category: string, id: string) => {
        if (expandedCategories.includes(category)) {
            setExpandedCategories(
                expandedCategories.filter((c) => c !== category)
            );
        } else {
            setExpandedCategories([...expandedCategories, category]);
        }

        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex gap-2 sm:gap-8 md:gap-8 lg:gap-16 mt-4 mb-8">
            {menu?.sections.map((section) => (
                <div
                    key={section.id}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() =>
                        toggleCategory(section.name, String(section.id))
                    }
                >
                    <div
                        className={`w-[4.5rem] sm:w-[5.5rem] h-[4.5rem] sm:h-[5.5rem] rounded-full ${
                            expandedCategories.includes(section.name)
                                ? "border-2"
                                : ""
                        } flex items-center justify-center ${
                            expandedCategories.includes(section.name)
                                ? "border-brown-700"
                                : ""
                        }`}
                    >
                        <LazyImage
                            image={section.image}
                            altName={section.name}
                            className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-full"
                        />
                    </div>
                    <p className="mt-2 text-sm font-medium">
                        {section.name === "Desserts"
                            ? t("desserts")
                            : section.name}
                    </p>
                    {expandedCategories.includes(section.name) && (
                        <div className="w-full h-1 mt-1 bg-brown-700"></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Categories;
