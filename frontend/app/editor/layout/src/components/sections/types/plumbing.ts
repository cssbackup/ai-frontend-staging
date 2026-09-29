export type BlogPost = Record<string, any>;
export type BlogDetailData = Record<string, any> & { slug?: string };
export type CareerPageData = Record<string, any>;
export type JobDetailItem = Record<string, any> & { slug?: string };
export type JObDetailsBannerData = Record<string, any>;
export type ProjectDetailItem = Record<string, any> & { slug?: string };
export type ProjectDetailsData = {
  banner?: Record<string, any>;
  projects: Record<string, any>;
  projectDetailItems?: ProjectDetailItem[];
};
export type ProjectSectionVariantData = Record<string, any>;
export type ServiceDetailData = Record<string, any> & { slug?: string };
export type ServiceLegalPageData = Record<string, any>;
export type ServiceSitemapData = Record<string, any>;
export type TeamMemberDetailData = Record<string, any> & { slug?: string };
export type TeamDetailsData = {
  banner?: Record<string, any>;
  members: Record<string, any>;
  teamDetailItems?: TeamMemberDetailData[];
};
export type TestimonialData = Record<string, any>;
