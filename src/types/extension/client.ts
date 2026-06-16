import type { ElectronCookie, Status } from "../core";
import type { ExtensionFilterConfig, SearchOptions } from "../filters";
import type { Episode } from "../series/anime";
import type { Chapter, ChapterPages } from "../series/manga";
import type { ExtensionMetadata } from "./metadata";
import type { ExtensionSettings } from "./settings";
import type { Video } from "./video";

// ==================== Function Types ====================

/** Searches for series */
export type SearchSeries<T> = (
  query?: string,
  options?: ScrapingOptions,
) => Promise<SeriesListResponse<T>>;

/** Gets a specific series */
export type GetSeries<T> = (query: string, options?: ScrapingOptions) => Promise<T | null>;

/** Gets popular series */
export type GetPopularSeries<T> = (options?: ScrapingOptions) => Promise<SeriesListResponse<T>>;

/** Gets latest series */
export type GetLatestSeries<T> = (options?: ScrapingOptions) => Promise<SeriesListResponse<T>>;

/** Gets manga chapters */
export type GetMangaChapters = (query: string, options?: ScrapingOptions) => Promise<Chapter[]>;

/** Gets chapter pages */
export type GetChapterPages = (query: string, options?: ScrapingOptions) => Promise<ChapterPages>;

/** Gets an image */
export type GetImage = (url: string) => Promise<{
  data: ArrayBuffer;
  contentType: string;
}>;

/** Gets filter configuration */
export type GetFilterConfig = (params?: GetFilterConfigParams) => ExtensionFilterConfig;

/** Gets series status */
export type GetSeriesStatus = (status?: string | null) => Status;

/** Gets metadata */
export type GetMetadata = () => ExtensionMetadata;

/** Gets episodes */
export type GetEpisodes = (query: string, options?: ScrapingOptions) => Promise<Episode[]>;

export type GetVideos = (url: string) => Promise<Video[]>;

// ==================== Interfaces ====================

/** Options for scraping operations */
export interface ScrapingOptions {
  /** Search-specific options */
  searchOptions?: SearchOptions;
}

/** Paginated series list response */
export interface SeriesListResponse<T> {
  /** Array of series data */
  data: T[];
  /** Pagination information */
  pagination?: {
    /** Whether more pages are available */
    hasMore: boolean;
    /** Next page number (null if no more) */
    nextPage: number | null;
  };
}

/** Parameters for getting filter config */
export interface GetFilterConfigParams {
  /** Whether to include NSFW filters */
  includeNsfw?: boolean;
}

export type GetAllCookies = (extensionId: string) => Promise<{
  defaultCookies: ElectronCookie[];
  persistCookies: ElectronCookie[];
}>;

/** Constructor options for extension client */
export interface ExtensionClientConstructorOptions {
  /** Extension settings */
  settings?: Record<string, any>;

  getAllCookies?: GetAllCookies;
}

/** Extension settings preferences function */
export type GetSettingsPreference = () => ExtensionSettings;
