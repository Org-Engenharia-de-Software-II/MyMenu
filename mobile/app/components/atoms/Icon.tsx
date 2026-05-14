import {
  ArrowLeft,
  BookOpen,
  Check,
  ChefHat,
  ChevronRight,
  ClipboardList,
  Clock3,
  Drumstick,
  Eye,
  Filter,
  Home,
  Plus,
  Refrigerator,
  Search,
  ShieldQuestion,
  Trash2,
  User,
  Utensils,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react-native';

type IconName =
  | 'home'
  | 'menu'
  | 'profile'
  | 'fridge'
  | 'plus'
  | 'search'
  | 'book'
  | 'utensils'
  | 'clock'
  | 'difficulty'
  | 'check'
  | 'meat'
  | 'chef'
  | 'trash'
  | 'back'
  | 'filter'
  | 'list'
  | 'eye'
  | 'arrowRight';

type IconProps = LucideProps & {
  name: IconName;
};

const iconMap: Record<IconName, LucideIcon> = {
  home: Home,
  menu: BookOpen,
  profile: User,
  fridge: Refrigerator,
  plus: Plus,
  search: Search,
  book: BookOpen,
  utensils: Utensils,
  clock: Clock3,
  difficulty: ShieldQuestion,
  check: Check,
  meat: Drumstick,
  chef: ChefHat,
  trash: Trash2,
  back: ArrowLeft,
  filter: Filter,
  list: ClipboardList,
  eye: Eye,
  arrowRight: ChevronRight,
};

export function Icon({ name, ...props }: IconProps) {
  const Component = iconMap[name];
  return <Component {...props} />;
}
