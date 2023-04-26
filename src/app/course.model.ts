interface VisibleInstructors  {
    id: number;
    title: string;
    name: string;
    display_name: string;
    job_title: string;
    image_50x50: string;
    image_100x100: string;
    initials: string;
    url: string;
}


export interface Course {
    id: number;
    title: string;
    url: string;
    price: string;
    discount_price: string;
    headline: string;
    rating: number;
    num_reviews: number;
    description: string;
    image_480x270: string;
    primary_category: { title: string; url: string; };
    created: string;
    objectives_summary: string[];
    requirements_data: { items: string[]}
    visible_instructors: VisibleInstructors[];
}
